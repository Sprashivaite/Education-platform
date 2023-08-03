import React, { useState } from "react";
import { Card, Typography, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import { Class } from "../pages/ClassPage/ClassPage";

const { Title, Text } = Typography;

export interface Course {
  _id: string;
  title: string;
  description: string;
  classes: Class[];
}

interface CourseItemProps {
  course: Course;
  onUpdateCourse: (courseId: string, updatedCourse: Partial<Course>) => void;
}

const CourseItem: React.FC<CourseItemProps> = ({ course, onUpdateCourse }) => {
  // const [classes, setClasses] = useState<any[]>(course.classes);
  // useEffect(() => {
  //   getClassesForCourse(course._id)
  //     .then((data) => setClasses(data))
  //     .catch((error) =>
  //       console.error("Ошибка при получении классов для курса:", error)
  //     );
  // }, [course._id]);

  const [editing, setEditing] = useState(false);
  const [form] = Form.useForm();

  // const handleEditClick = () => {
  //   form.setFieldsValue({
  //     title: course.title,
  //     description: course.description,
  //     classes: course.classes ? course.classes.join(", ") : "",
  //   });
  //   setEditing(true);
  // };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
      const updatedCourse = {
        title: values.title,
        description: values.description,
        classes: values.classes
          .split(",")
          .map((className: string) => className.trim()),
      };
      onUpdateCourse(course._id, updatedCourse);
      setEditing(false);
    });
  };

  return (
    <Card title={<Link to={`/course/${course._id}`}>{course.title}</Link>}>
      {editing ? (
        <Form form={form} layout="vertical">
          <Form.Item label="Title" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Classes" name="classes">
            <Input />
          </Form.Item>
          <Button onClick={handleUpdate}>Сохранить</Button>
          <Button onClick={handleCancel}>Отмена</Button>
        </Form>
      ) : (
        <>
          <Text>{course.description}</Text>
          <Title level={5}>Занятия:</Title>
          {/* {classes.length !== 0 && (
            <List
              dataSource={classes}
              renderItem={({ _id, title }) => (
                <List.Item key={_id}>
                  <Link to={`/class/${_id}`}>{title}</Link>
                </List.Item>
              )}
            />
          )} */}
          {/* <Button style={{ display: "block" }} onClick={handleEditClick}>
            Редактировать
          </Button> */}
        </>
      )}
    </Card>
  );
};

export default CourseItem;
