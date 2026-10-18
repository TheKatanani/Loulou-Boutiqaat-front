import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { CategoryStyled } from './styles'
import LogoLoading from '../common/LogoLoading'
import { STATUS } from '../../Actions'
import { useSelector } from 'react-redux'
import { selectPublishedCategoryies } from '../../redux/reducers/categories'
import { selectStatus } from '../../redux/reducers/categories'

const Category = () => {
  const categories = useSelector(selectPublishedCategoryies)
  const status = useSelector(selectStatus)
  const scrollRef = useRef(null)
  const isDown = useRef(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)
  const moved = useRef(false)

  if (status === STATUS.LOADING) {
    return <LogoLoading />
  }

  // Mouse drag-to-scroll support for desktop/testing
  const onMouseDown = (e) => {
    if (!scrollRef.current) return
    isDown.current = true
    moved.current = false
    startX.current = e.pageX - scrollRef.current.offsetLeft
    scrollLeft.current = scrollRef.current.scrollLeft
  }

  const onMouseLeave = () => {
    isDown.current = false
  }

  const onMouseUp = () => {
    isDown.current = false
  }

  const onMouseMove = (e) => {
    if (!isDown.current || !scrollRef.current) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    if (Math.abs(walk) > 5) {
      moved.current = true
    }
    scrollRef.current.scrollLeft = scrollLeft.current - walk
  }

  return (
    <CategoryStyled>
      <ul
        ref={scrollRef}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        onClickCapture={(e) => {
          if (moved.current) {
            e.preventDefault()
            e.stopPropagation()
            moved.current = false
          }
        }}
      >
        {categories?.map((category) => (
          <li key={category.id}>
            <NavLink to={`/home/الأقسام/${category.id}`}>
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </CategoryStyled>
  )
}

export default Category