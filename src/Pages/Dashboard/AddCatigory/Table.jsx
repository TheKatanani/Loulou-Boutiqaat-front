import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCatigory, selectCatigories, selectCatigoriesState, selectMood, setUpdateCatigory } from '../../../redux/reducers/catigories'
import { StyledTable } from '../sytled'
import { MOOD } from '../../../Actions'
const Table = () => {
  const catigories = useSelector(selectCatigories)
  const dispatch = useDispatch()
  const { id } = useSelector(selectCatigoriesState)
  const mood = useSelector(selectMood)
  return (
    <StyledTable>
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th className='discription'>discription</th>
          <th>background</th>
          <th>isVisibile</th>
          <th>update</th>
          <th>delete</th>
        </tr>
      </thead>
      <tbody>
        {
          catigories?.map(catigory => (
            <tr key={catigory.id} className={(mood === MOOD.UPDATE && catigory.id === id) ? `underUpdate` : undefined}>
              <td>{catigory.id}</td>
              <td>{catigory.name}</td>
              <td className='discription'>{catigory.discription?.slice(0, 50)}...</td>
              <td className='images'>{
                <img src={catigory.background} alt="" />
              }</td>
              <td>{catigory?.isVisibile !== (false || "false") ? 'visibile' : 'hidden'}</td>
              <td>
                <button className='update'
                  disabled={mood === MOOD.UPDATE && catigory.id === id}
                  onClick={() => {
                    dispatch(setUpdateCatigory({ catigory }))
                  }}
                >
                  update
                </button>
              </td>
              <td>
                <button className='delete' disabled={mood === MOOD.UPDATE && catigory.id === id}
                  onClick={() => {
                    dispatch(deleteCatigory({ id: catigory.id }))
                  }}>
                  delete
                </button>
              </td>
            </tr>
          ))
        }
      </tbody>
    </StyledTable>
  )
}

export default Table