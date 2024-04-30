const Header = ({course}) => <h2>{course.name}</h2>
const Part = ({name, exercises}) => <p>{name} {exercises}</p>
const Content = ({course}) => <>{course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}</>
const Total = ({course}) => <p><strong>total of {course.parts.reduce((total, part) => total + part.exercises, 0)} exercises</strong></p>
const Course = ({course}) => (
  <>
    <Header course={course}/>
    <Content course={course}/>
    <Total course={course}/>
  </>
)
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}
  export default App