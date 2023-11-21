'use client'
import React, { useEffect, useState } from 'react'

function page({ params }) {
    const { id: test_id } = params
    const project_data = JSON.parse(localStorage.getItem("project_selected"));

    const [tests, setTests] = useState([])
    const [questions, setQuestions] = useState([])

    const getTests = async () => {
        const request = await fetch(`https://fli2mqd2g8.execute-api.us-east-1.amazonaws.com/dev/tests/projects/${project_data.id}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

        const response = await request.json()

        const testsFiltered = response.filter((test) => test.type === "technical" && String(test.id) === String(test_id))
        await setTests(testsFiltered)
        testsFiltered[0].questions.forEach((question) => {
            question.selected = null
        })
        await setQuestions(testsFiltered[0].questions)

    }

    useEffect(() => {
        getTests()
    }, [])

    useEffect(() => {
        console.log({ questions })
    }, [questions])

    return (
        <div>
            <br />

            {tests.map((test) => (
                <div key={test.id}>
                    <h1>{test.title}</h1>
                    <h3>{test.type}</h3>
                    <h4>{test.difficulty_level}</h4>
                </div>
            ))}

            {
                questions.map((question, index) => (
                    <div key={question.id}>
                        <h4>{index + 1}. {question.description}</h4>
                        {
                            question.options.map((option) => (
                                <div key={option.id}>
                                    <input type="radio" id={option.id} name={question.id} value={option.id} onChange={(e) => {
                                        const newQuestions = [...questions]
                                        newQuestions[index].selected = e.target.value
                                        setQuestions(newQuestions)
                                    }} />
                                    <label htmlFor={option.id}>{option.description}</label>
                                </div>
                            ))
                        }
                    </div>
                ))
            }

            {
                questions.length > 0 && <button onClick={() => {
                    const newQuestions = [...questions]
                    const result = newQuestions.reduce((acc, question) => {
                        if (question.selected === question.answer) {
                            acc++
                        }
                        return acc
                    }, 0)
                    alert(`Your score is: ${result}/${newQuestions.length}`)
                }
                }>Submit</button>
            }
        </div>
    )
}

export default page