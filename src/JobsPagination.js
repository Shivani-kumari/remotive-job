import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function JobsPagination({limit,setLimit,hasNextPage}) {
    function adjustPage(amount){
        setLimit(prevLimit => prevLimit + amount)
    }
  return (
    <Pagination>
        
        {limit !==5 && <Pagination.Prev onClick={()=>adjustPage(-5)}>Prev</Pagination.Prev>}
   
        {hasNextPage && <Pagination.Next onClick={()=>adjustPage(5)}>Next</Pagination.Next>}
    </Pagination>
  )
}
