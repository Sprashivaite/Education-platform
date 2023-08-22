import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import Class from "../models/classModel.js";
import Course, { ICourse } from "../models/courseModel.js";
import path from "path";
import fs from "fs";
import httpStatus from "http-status-codes";
import { ErrorMessages } from "../types/errorMap.js";
import { validationResult } from "express-validator";

export const addLinkToClass = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { classId } = request.params;
  const { title, url } = request.body;
  const newLink = {
    title,
    url,
  };

  try {
    const classCreatedBy = await Class.findById(classId);

    if (
      request.userId &&
      classCreatedBy.createdBy._id.toString() !== request.userId
    ) {
      return response
        .status(httpStatus.FORBIDDEN)
        .json({ message: ErrorMessages.AccessForbidden });
    }
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { usefulLinks: newLink } },
      { new: true }
    );
    if (!updatedClass) {
      return response
        .status(httpStatus.NOT_FOUND)
        .json({ message: ErrorMessages.ClassNotFound });
    }

    return response
      .status(httpStatus.OK)
      .json({ message: ErrorMessages.LinkAdded, class: updatedClass });
  } catch (error) {
    next(error);
  }
};

export const addLinkToFile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response
      .status(httpStatus.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const { classId } = request.params;
  const { title, url } = request.body;

  try {
    const classCreatedBy = await Class.findById(classId);

    if (
      request.userId &&
      classCreatedBy.createdBy._id.toString() !== request.userId
    ) {
      return response
        .status(httpStatus.FORBIDDEN)
        .json({ message: ErrorMessages.AccessForbidden });
    }
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { usefulLinks: { title, url, isFile: true } } },
      { new: true }
    );

    if (!updatedClass) {
      return response
        .status(httpStatus.NOT_FOUND)
        .json({ message: ErrorMessages.ClassNotFound });
    }

    return response.status(httpStatus.OK).json({
      message: ErrorMessages.LinkAdded,
      class: updatedClass,
    });
  } catch (error) {
    next(error);
  }
};

export const getClasses = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { courseId } = request.params;
  try {
    const classes = await Class.find({ courseId });
    response.json(classes);
  } catch (error) {
    next(error);
  }
};

export const getClass = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const classId = request.params.id;
  try {
    const classCreatedBy = await Class.findById(classId);

    if (
      request.userId &&
      classCreatedBy.createdBy._id.toString() !== request.userId
    ) {
      return response
        .status(httpStatus.FORBIDDEN)
        .json({ message: ErrorMessages.AccessForbidden });
    }
    const classDetail = await Class.findById(classId);
    if (!classDetail) {
      return response
        .status(httpStatus.NOT_FOUND)
        .json({ message: ErrorMessages.ClassNotFound });
    }

    return response.json(classDetail);
  } catch (error) {
    next(error);
  }
};

export const addComment = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response
      .status(httpStatus.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const classId = request.params.id;
  const { text } = request.body;
  try {
    const classDetail = await Class.findById(classId);
    if (!classDetail) {
      return response
        .status(httpStatus.NOT_FOUND)
        .json({ message: ErrorMessages.ClassNotFound });
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
    next(error);
  }
};

export const addClassToCourse = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const courseId = request.params.courseId;
  const { title, description } = request.body;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return response
        .status(httpStatus.NOT_FOUND)
        .json({ message: ErrorMessages.CourseNotFound });
    }
    if (request.userId && course.createdBy._id.toString() !== request.userId) {
      return response
        .status(httpStatus.FORBIDDEN)
        .json({ message: ErrorMessages.AccessForbidden });
    }

    const newClass = new Class({
      title,
      description,
      createdBy: request.userId,
      courseId,
    });
    const savedClass = await newClass.save();

    const classObjectId = savedClass._id;
    if (course.classes === undefined) course.classes = [];
    if (course.classes.includes(classObjectId)) {
      return response
        .status(httpStatus.BAD_REQUEST)
        .json({ message: ErrorMessages.ClassNotAddedToCourse });
    }

    course.classes.push(classObjectId);

    const updatedCourse: ICourse = await course.save();

    return response.json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

export const updateClass = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    return response
      .status(httpStatus.BAD_REQUEST)
      .json({ errors: errors.array() });
  }
  const classId = request.params.id;
  const { title, description } = request.body;

  try {
    const classCreatedBy = await Class.findById(classId);

    if (
      request.userId &&
      classCreatedBy.createdBy._id.toString() !== request.userId
    ) {
      return response
        .status(httpStatus.FORBIDDEN)
        .json({ message: ErrorMessages.AccessForbidden });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { title, description },
      { new: true }
    );

    if (!updatedClass) {
      return response
        .status(httpStatus.NOT_FOUND)
        .json({ message: ErrorMessages.ClassNotFound });
    }

    return response.json(updatedClass);
  } catch (error) {
    next(error);
  }
};

export const addVideo = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const classId = request.params.id;
    const classCreatedBy = await Class.findById(classId);

    if (
      request.userId &&
      classCreatedBy.createdBy._id.toString() !== request.userId
    ) {
      return response
        .status(httpStatus.FORBIDDEN)
        .json({ message: ErrorMessages.AccessForbidden });
    }
    if (!request.file) {
      return response
        .status(httpStatus.BAD_REQUEST)
        .json({ message: ErrorMessages.FileNotFound });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { videoPath: request.file.filename },
      { new: true }
    );

    if (!updatedClass) {
      return response
        .status(httpStatus.NOT_FOUND)
        .json({ message: ErrorMessages.ClassNotFoundForVideo });
    }

    return response
      .status(httpStatus.OK)
      .json({ message: ErrorMessages.Successfully });
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
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

    response.writeHead(httpStatus.OK, head);
    file.pipe(response);
  } catch (error) {
    next(error);
  }
};

export const addFile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const classId = request.params.id;
    const classCreatedBy = await Class.findById(classId);

    if (
      request.userId &&
      classCreatedBy.createdBy._id.toString() !== request.userId
    ) {
      return response
        .status(httpStatus.FORBIDDEN)
        .json({ message: ErrorMessages.AccessForbidden });
    }
    if (!request.file) {
      return response
        .status(httpStatus.BAD_REQUEST)
        .json({ message: ErrorMessages.FileNotFound });
    }
    if (!request.file) {
      return response
        .status(httpStatus.BAD_REQUEST)
        .json({ message: ErrorMessages.FileNotFound });
    }

    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      { $push: { files: request.file.filename } },
      { new: true }
    );

    if (!updatedClass) {
      return response
        .status(httpStatus.NOT_FOUND)
        .json({ message: ErrorMessages.ClassNotFoundForVideo });
    }

    return response
      .status(httpStatus.OK)
      .json({ message: ErrorMessages.Successfully });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getFile = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const filename = request.params.filename;

  const idx = filename.indexOf(".") + 1;
  const subdirectory = filename.substring(idx);

  const filePath = path.join("src/files", subdirectory, filename);
  response.sendFile(filePath, { root: "." });
};
