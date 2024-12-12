import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Quiz from "../components/Quiz";
import styled from "styled-components";
import Header from "../components/Header";

const LessonPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const courseId = params.courseId;
    const lessonId = params.lessonId;

    const [data, setData] = React.useState();

    const fetchData = async () => {
        const accessToken = sessionStorage.getItem("accessToken");
        try {
            const response = await fetch(`http://localhost:8000/api/courses/lessons/${lessonId}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                throw new Error("An error occurred while fetching data");
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
        const data = fetchData();
        data.then((data) => {
            setData(data);
            console.log(data);
        });
        
    }, [navigate]);

    if (!data) {
        return (
            <Container>
                <Title>Loading...</Title>
            </Container>
        );
    }

    return (
        <>
        <Header />        
        <Container>
            <Title>{data.title}</Title>
            <VideoContainer>
                <iframe
                    width="900"
                    height="500"
                    src={data.video_url}
                    title="STEM"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                ></iframe>
            </VideoContainer>

            <Quiz quizData={data.quiz} />
        </Container>
        </>
    );
};

export default LessonPage;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 24px;
    margin-bottom: 20px;
`;

const VideoContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    width: 100%;
    height: 500px;
`;