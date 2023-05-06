import React, { useState } from 'react'
import api from '../api'
import { v4 as uuid } from 'uuid'

const Users = () => {
  const [users, setUsers] = useState(api.users.fetchAll())

  const handleDelete = (userId) => {
    users.forEach((element) => {
      setUsers((prevState) => prevState.filter((user) => userId !== user._id))
    })
  }
  const countUsers = users.length

  const renderPhrase = (countUsers) => {
    if (countUsers === 1) {
      return (
        <span className="badge bg-primary">
          {countUsers} человек тусанет с тобой сегодня{' '}
        </span>
      )
    } else if (countUsers === 2 || countUsers === 3 || countUsers === 4) {
      return (
        <span className="badge bg-primary">
          {countUsers} человека тусанет с тобой сегодня{' '}
        </span>
      )
    } else if (countUsers === 0) {
      return (
        <span className="badge bg-danger">
          Никто не тусанет с тобой сегодня
        </span>
      )
    } else {
      return (
        <span className="badge bg-primary">
          {countUsers} человек тусанет с тобой сегодня{' '}
        </span>
      )
    }
  }
  return (
    <>
      <h3>{renderPhrase(countUsers)}</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Имя</th>
            <th scope="col">Качества</th>
            <th scope="col">Профессия</th>
            <th scope="col">Встретился,раз</th>
            <th scope="col">Оценка</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={uuid()}>
              <th scope="row">{user.name}</th>
              <td>
                {user.qualities.map((qualitie) => (
                  <span
                    key={uuid()}
                    className={`badge m-1 bg-${qualitie.color}`}
                  >
                    {qualitie.name}
                  </span>
                ))}
              </td>
              <td>{user.profession.name}</td>
              <td>{user.completedMeetings}</td>
              <td>{user.rate}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm m-2"
                  onClick={() => handleDelete(user._id)}
                >
                  delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Users
