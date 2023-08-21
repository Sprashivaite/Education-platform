import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import Course, { ICourse } from "../models/courseModel.js";
import { ErrorMessages } from "../types/errorMap.js";

export const getCourses = async (
  _: Request,
  response: Response,
  next: NextFunction
) => {
  try {
    const courses = await Course.find();
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
    const course = await Course.findById(courseId);
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

    const newCourse = new Course(newCourseData);
    const savedCourse = await newCourse.save();
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
  const courseId = request.params.id;
  const { title, description } = request.body;

  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { title, description },
      { new: true }
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
