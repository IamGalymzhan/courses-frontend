import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";

const MainPage = () => {
  const navigate = useNavigate();

  const [courses, setCourses] = React.useState([]);

  const fetchCourses = async () => {
    const accessToken = sessionStorage.getItem("accessToken");
    try {
      console.log(accessToken);
      const response = await fetch("https://courses-platform-backend.onrender.com/api/courses/courses", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
        
      });
      
      console.log(response);

      if (!response.ok) {
        throw new Error("An error occurred while fetching courses");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      navigate("/login");
    }
  };

  React.useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      navigate("/login");
    }
    const data = fetchCourses();
    data.then((courses) => {
      setCourses(courses);
    });
  }, []);

  return (
    <>
    <Header />
    <Container>
      <Title>Заголовок</Title>
      <CourseGrid>
        {courses.map((course) => (
          <StyledLink to={`course/${course.id}`} key={course.id}>
            <CourseCard >
              <CourseCardTitle>{course.name}</CourseCardTitle>
            </CourseCard>
          </StyledLink>
        ))}
      </CourseGrid>
      {/*selectedCourse && (
        <DetailsPopup>
          <CourseDetails>
            <CourseTitle>{selectedCourse.title}</CourseTitle>
            <CourseDescription>{selectedCourse.description}</CourseDescription>
            <CloseButton onClick={() => setSelectedCourse(null)}>Close</CloseButton>
          </CourseDetails>
        </DetailsPopup>
      )*/}
    </Container>
    </>
  );
};

export default MainPage;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background: #f9f9f9;
  min-height: 100vh;
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

const CourseGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const CourseCard = styled.div`
  background: #4facfe;
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  transition: transform 0.2s, background 0.2s;

  &:hover {
    background: #007acc;
    transform: scale(1.05);
  }
`;

const CourseCardTitle = styled.h3`
  font-size: 18px;
  margin: 0;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;