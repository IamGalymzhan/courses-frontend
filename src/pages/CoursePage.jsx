import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Text from "../components/Text";
import Header from "../components/Header";

const CoursePage = () => {
    const navigate = useNavigate();
    const params = useParams(); 
    const id = params.id;

    const [data, setData] = React.useState([]);
    const lessons = data.lessons || [];
    const title = data.name || "";

    const fetchLessons = async () => {
        const accessToken = sessionStorage.getItem("accessToken");
        try {
            const response = await fetch(`http://localhost:8000/api/courses/courses/${id}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
            });

            console.log(response);

            if (!response.ok) {
                throw new Error("An error occurred while fetching lessons");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            navigate("/login");
        }
    }

    React.useEffect(() => {
        const accessToken = sessionStorage.getItem("accessToken");
        if (!accessToken) {
            navigate("/login");
        }
        const fetchedData = fetchLessons();
        fetchedData.then((data) => {
            setData(data);
            
        });
        
    }, [navigate]);

    return (
        <>
        <Header />
        <Container>
            <Title>{title}</Title>

            <Text
                title="Что такое STEM образование?"
                text=""
                image="https://as2.ftcdn.net/v2/jpg/03/80/57/19/1000_F_380571997_9brmW7E5lXjtAn3BojnzhtaTGERM3KI2.jpg"
                text2="STEM-образование (наука, технологии, инженерия, математика) — это междисциплинарный подход к обучению, который развивает навыки решения реальных проблем, критического мышления и креативности. Оно помогает учащимся понимать современные технологии, готовит к востребованным профессиям и стимулирует инновации.

                STEM важен, потому что он отвечает на вызовы цифровой эпохи, способствуя формированию специалистов для развивающихся отраслей, таких как ИТ, робототехника, биоинженерия и экологические технологии. Это не только подготовка к карьере, но и развитие гибкости мышления, необходимой для успешной жизни в мире, полном изменений."
            />

            <LessonList>
                {lessons.map((lesson) => (
                    <Link to={`lesson/${lesson.id}`} key={lesson.id}>
                        <LessonItem>
                            {lesson.title}
                        </LessonItem>
                    </Link>
                ))}
            </LessonList>
            
        </Container>
        </>
    );
};

export default CoursePage;

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

const LessonList = styled.ul`
  list-style: none;
  padding: 0;
  width: 100%;
  max-width: 800px;
`;

const LessonItem = styled.li`
  background: #4facfe;
  color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #007acc;
  }
`;
