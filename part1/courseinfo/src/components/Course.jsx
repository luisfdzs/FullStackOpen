const Header = ({course}) => <h2>{course.name}</h2>
const Part = ({name, exercises}) => <p>{name} {exercises}</p>
const Content = ({course}) => <>{course.parts.map(part => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}</>
const Total = ({course}) => <p><strong>total of {course.parts.reduce((total, part) => total + part.exercises, 0)} exercises</strong></p>
export const Course = ({course}) => (
  <>
    <Header course={course}/>
    <Content course={course}/>
    <Total course={course}/>
  </>
)