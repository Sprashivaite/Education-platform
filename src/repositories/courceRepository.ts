import Course, { ICourse } from "../models/courseModel.js";

export const courseRepository = {
  async findByAll() {
    const course = await Course.find();
    return course;
  },
  async findById(courseId: string) {
    const course = await Course.findById(courseId);
    return course;
  },
  async createCourse(newCourseData: ICourse) {
    const newCourse = new Course(newCourseData);
    const savedCourse = await newCourse.save();
    return savedCourse;
  },
  async updateCourse(courseId: string, title: string, description: string) {
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { title, description },
      { new: true }
    );
    return updatedCourse;
  },
};
