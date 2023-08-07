import { Request, Response } from "express";
import User from "../models/user.js";
import Class from "../models/classModel.js";
import Course, { ICourse } from "../models/courseModel.js";

export const grantAccessToClass = async (
  request: Request,
  response: Response
) => {
  const { classId } = request.params;
  const { userId } = request.body;

  try {
    const user = await User.findById(userId);
    const classItem = await Class.findById(classId);
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

    classItem.grantedClassAccess.push(userId);
    await user.save();

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
  const { link } = request.body;

  try {
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { usefulLinks: link } },
      { new: true }
    );

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
      classDetail.createdBy._id.toString() !== request.userId
    ) {
      return response.status(403).json({ message: "Доступ запрещен" });
    }

    return response.json(classDetail);
  } catch (error) {
    return response.status(500).json({ message: "Ошибка сервера" });
  }
};

export const addComment = async (request: Request, response: Response) => {
  async (request: Request, response: Response) => {
    const classId = request.params.id;
    const { text } = request.body;
    try {
      const classDetail = await Class.findById(classId);
      if (!classDetail) {
        return response.status(404).json({ message: "Класс не найден" });
      }
      classDetail.comments.push({
        text,
        createdBy: request.userId,
        createdAt: new Date(),
      });
      const updatedClass = await classDetail.save();
      return response.json(updatedClass);
    } catch (error) {
      return response.status(500).json({ message: "Ошибка сервера" });
    }
  };
};

export const addClassToCourse = async (req: Request, res: Response) => {
  const courseId = req.params.courseId;
  // const { title, description, videoUrl } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Курс не найден" });
    }

    const newClass = new Class({
      ...req.body,
      createdBy: req.userId,
      courseId,
    });
    const savedClass = await newClass.save();

    const classObjectId = savedClass._id;
    if (course.classes === undefined) course.classes = [];
    if (course.classes.includes(classObjectId)) {
      return res.status(400).json({ message: "Занятие уже добавлено в курс" });
    }

    course.classes.push(classObjectId);

    const updatedCourse: ICourse = await course.save();

    return res.json(updatedCourse);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ошибка сервера" });
  }
};
