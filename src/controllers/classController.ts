import { Request, Response } from "express";
import User from "../models/user.js";
import Class from "../models/classModel.js";
import Course, { ICourse } from "../models/courseModel.js";
import path from "path";
import fs from "fs";

export const grantAccessToClass = async (
  request: Request,
  response: Response
) => {
  const { classId, userId } = request.params;

  try {
    const user = await User.findById(userId);
    const classItem = await Class.findById(classId);

    if (
      request.userId &&
      classItem.createdBy._id.toString() !== request.userId
    ) {
      return response.status(403).json({ message: "Доступ запрещен" });
    }

    if (!user) {
      return response.status(404).json({ message: "Пользователь не найден" });
    }

    if (
      classItem.grantedClassAccess.some(({ _id }) => userId === _id.toString())
    ) {
      return response
        .status(409)
        .json({ message: "Класс уже присвоен пользователю" });
    }
    classItem.grantedClassAccess.push(userId as any);
    await classItem.save();

    return response
      .status(200)
      .json({ message: "Доступ успешно предоставлен" });
  } catch (error) {
    console.error("Ошибка при предоставлении доступа:", error);
    return response.status(500).json({ message: "Ошибка сервера" });
  }
};

export const addLinkToClass = async (request: Request, response: Response) => {
  const { classId } = request.params;
  const { title, url } = request.body;
  const newLink = {
    title,
    url,
  };

  try {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { usefulLinks: newLink } },
      { new: true }
    );
    if (
      request.userId &&
      updatedClass.createdBy._id.toString() !== request.userId
    ) {
      return response.status(403).json({ message: "Доступ запрещен" });
    }

    if (!updatedClass) {
      return response.status(404).json({ message: "Класс не найден" });
    }

    return response
      .status(200)
      .json({ message: "Ссылка успешно добавлена", class: updatedClass });
  } catch (error) {
    console.error("Ошибка при добавлении ссылки:", error);
    return response.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export const addLinkToFile = async (request: Request, response: Response) => {
  const { classId } = request.params;
  const { title, url } = request.body;

  try {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { usefulLinks: { title, url, isFile: true } } },
      { new: true }
    );
    if (
      request.userId &&
      updatedClass.createdBy._id.toString() !== request.userId
    ) {
      return response.status(403).json({ message: "Доступ запрещен" });
    }

    if (!updatedClass) {
      return response.status(404).json({ message: "Класс не найден" });
    }

    return response.status(200).json({
      message: "Ссылка на файл успешно добавлена",
      class: updatedClass,
    });
  } catch (error) {
    console.error("Ошибка при добавлении ссылки на файл:", error);
    return response.status(500).json({ message: "Внутренняя ошибка сервера" });
  }
};

export const getClasses = async (request: Request, response: Response) => {
  const { courseId } = request.params;
  try {
    const classes = await Class.find({ courseId });
    response.json(classes);
  } catch (error) {
    console.log(error.message);
    response.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getClass = async (request: Request, response: Response) => {
  const classId = request.params.id;
  try {
    const classDetail = await Class.findById(classId);
    if (!classDetail) {
      return response.status(404).json({ message: "Класс не найден" });
    }
    if (
      request.userId &&
      classDetail.createdBy._id.toString() !== request.userId &&
      !classDetail.grantedClassAccess.includes(request.userId as any)
    ) {
      return response.status(403).json({ message: "Доступ запрещен" });
    }

    return response.json(classDetail);
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Ошибка сервера" });
  }
};

export const addComment = async (request: Request, response: Response) => {
  const classId = request.params.id;
  const { text } = request.body;
  try {
    const classDetail = await Class.findById(classId);
    if (!classDetail) {
      return response.status(404).json({ message: "Класс не найден" });
    }
    if (!classDetail.usefulLinks) {
      classDetail.usefulLinks = [];
    }
    classDetail.comments.push({
      text,
      createdBy: request.userId,
      createdAt: new Date(),
    });
    const updatedClass = await classDetail.save();
    return response.json(updatedClass);
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Ошибка сервера" });
  }
};

export const addClassToCourse = async (
  request: Request,
  response: Response
) => {
  const courseId = request.params.courseId;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return response.status(404).json({ message: "Курс не найден" });
    }
    if (request.userId && course.createdBy._id.toString() !== request.userId) {
      return response.status(403).json({ message: "Доступ запрещен" });
    }

    const newClass = new Class({
      ...request.body,
      createdBy: request.userId,
      courseId,
    });
    const savedClass = await newClass.save();

    const classObjectId = savedClass._id;
    if (course.classes === undefined) course.classes = [];
    if (course.classes.includes(classObjectId)) {
      return response
        .status(400)
        .json({ message: "Занятие уже добавлено в курс" });
    }

    course.classes.push(classObjectId);

    const updatedCourse: ICourse = await course.save();

    return response.json(updatedCourse);
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Ошибка сервера" });
  }
};

export const updateClass = async (request: Request, response: Response) => {
  const classId = request.params.id;
  const { title, description } = request.body;

  try {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { title, description },
      { new: true }
    );

    if (!updatedClass) {
      return response.status(404).json({ message: "Класс не найден" });
    }
    if (
      request.userId &&
      updatedClass.createdBy._id.toString() !== request.userId
    ) {
      return response.status(403).json({ message: "Доступ запрещен" });
    }

    return response.json(updatedClass);
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "ошибка сервера" });
  }
};

export const addVideo = async (request: Request, response: Response) => {
  try {
    const classId = request.params.id;
    if (!request.file) {
      return response.status(400).json({ message: "Не загружен файл" });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { videoPath: request.file.filename },
      { new: true }
    );
    if (
      request.userId &&
      updatedClass.createdBy._id.toString() !== request.userId
    ) {
      return response.status(403).json({ message: "Доступ запрещен" });
    }

    if (!updatedClass) {
      return response.status(404).json({ message: "Занятие не найдено" });
    }

    return response
      .status(200)
      .json({ message: "Файл загружен и класс обновлен" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getVideo = async (request: Request, response: Response) => {
  try {
    const videoFileName = request.params.videoFileName;
    const idx = videoFileName.indexOf(".") + 1;
    const subdirectory = videoFileName.substring(idx);

    const videoPath = path.join("src/files", subdirectory, videoFileName);
    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;

    const file = fs.createReadStream(videoPath);
    const head = {
      "Content-Length": fileSize,
      "Content-Type": "video/mp4",
    };

    response.writeHead(200, head);
    file.pipe(response);
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: "Ошибка сервера" });
  }
};

export const addFile = async (request: Request, response: Response) => {
  try {
    const classId = request.params.id;
    if (!request.file) {
      return response.status(400).json({ message: "Не загружен файл" });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { files: request.file.filename } },
      { new: true }
    );
    if (
      request.userId &&
      updatedClass.createdBy._id.toString() !== request.userId
    ) {
      return response.status(403).json({ message: "Доступ запрещен" });
    }

    if (!updatedClass) {
      return response.status(404).json({ message: "Занятие не найдено" });
    }

    return response
      .status(200)
      .json({ message: "Файл загружен и класс обновлен" });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Ошибка сервера" });
  }
};

export const getFile = async (request: Request, response: Response) => {
  const filename = request.params.filename;

  const idx = filename.indexOf(".") + 1;
  const subdirectory = filename.substring(idx);

  const filePath = path.join("src/files", subdirectory, filename);
  response.sendFile(filePath, { root: "." });
};
