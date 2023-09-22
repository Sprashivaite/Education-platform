import { NextFunction, Request, Response } from "express";
import User from "../models/user.js";
import Class, { IClass } from "../models/classModel.js";
import Course, { ICourse } from "../models/courseModel.js";
import path from "path";

import httpStatus from "http-status-codes";
import { ErrorMessages } from "../types/errorMap.js";
import { validationResult } from "express-validator";
import { classRepository } from "../repositories/classRepository.js";
import { courseRepository } from "../repositories/courceRepository.js";
import { classService } from "../service/classService.js";

export const addLinkToClass = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
      return response
        .status(httpStatus.BAD_REQUEST)
        .json({ errors: errors.array() });
    }

    const { classId } = request.params;
    const { title, url } = request.body;
    const newLink = {
      title,
      url,
    };
    const updatedClass = classRepository.addLinkToClass(classId, newLink);
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

export const getClasses = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { courseId } = request.params;
  try {
    const classes = await classRepository.findByAll(courseId);
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
  try {
    const { classId } = request.params;
    const classDetail = await classRepository.findById(classId);
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

  const { classId } = request.params;
  const { text } = request.body;
  try {
    const classDetail = await classRepository.findById(classId);
    if (!classDetail) {
      return response
        .status(httpStatus.NOT_FOUND)
        .json({ message: ErrorMessages.ClassNotFound });
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
    const course = await courseRepository.findById(courseId);
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
    const updatedClass = classRepository.updateClass(
      classId,
      title,
      description
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
    const { classId } = request.params;
    const updatedClass = await classRepository.addVideo(
      classId,
      request.file.filename
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
    const { videoFileName } = request.params;

    const { file, head } = classService.getVideo(videoFileName);
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
    const { classId } = request.params;
    const { title, url } = request.body;

    if (!request.file) {
      return response
        .status(httpStatus.BAD_REQUEST)
        .json({ message: ErrorMessages.FileNotFound });
    }
    const updatedClass = await classRepository.addFile(
      classId,
      request.file.filename
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

export const getFile = async (request: Request, response: Response) => {
  const filename = request.params.filename;
  const filePath = classService.getFile(filename);

  response.sendFile(filePath, { root: "." });
};
