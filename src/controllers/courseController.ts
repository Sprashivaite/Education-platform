import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import Course, { ICourse } from "../models/courseModel.js";
import { ErrorMessages } from "../types/errorMap.js";
import { validationResult } from "express-validator";
import { courseRepository } from "../repositories/courceRepository.js";

export const getCourses = async (
  _: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const courses = await courseRepository.findByAll();
    response.json(courses);
  } catch (error) {
    next(error);
  }
};

export const getCourseById = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const courseId = request.params.id;
  try {
    const course = await courseRepository.findById(courseId);
    if (!course) {
      return response
        .status(httpStatus.NOT_FOUND)
        .json({ message: ErrorMessages.CourseNotFound });
    }

    return response.json(course);
  } catch (error) {
    next(error);
  }
};

export const createCourse = async (
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
  try {
    const { title, description } = request.body;
    const newCourseData: ICourse = {
      title,
      description,
      createdBy: {
        _id: request.userId,
        username: request.username,
      },
    };

    const savedCourse = courseRepository.createCourse(newCourseData);
    response.status(httpStatus.CREATED).json(savedCourse);
  } catch (error) {
    next(error);
  }
};

export const updateCourse = async (
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
  const courseId = request.params.id;
  const { title, description } = request.body;

  try {
    const updatedCourse = await courseRepository.updateCourse(
      courseId,
      title,
      description
    );

    if (!updatedCourse) {
      return response
        .status(httpStatus.NOT_FOUND)
        .json({ message: ErrorMessages.CourseNotFound });
    }

    return response.json(updatedCourse);
  } catch (error) {
    next(error);
  }
};
