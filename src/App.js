import React, { useState } from 'react'
import useFetchJobs from './useFetchJobs'
import {Container} from 'react-bootstrap'
import Job from './Job'
import JobsPagination from './JobsPagination'
import SearchForm from './SearchForm'
function App() {
  const [params,setParams] = useState({})
  const [limit,setLimit] = useState(5)
  const {jobs, loading,  error,hasNextPage} = useFetchJobs(params,limit)
  
  function handleParamChange(e) {
    const parms = e.target.name
    const value = e.target.value
    setLimit(5)
    setParams(prevParms => {
      return {...prevParms, [parms]:value}
    })
  }
  
  return (
    <Container >
      <SearchForm parms={params} onParamChange={handleParamChange}></SearchForm>
<JobsPagination limit={limit} setLimit={setLimit}/>
      {loading && <h1>Loading...</h1>}
      {error && <h1>Error. Try Refreshing.</h1>}
      {jobs.map((job,index) =>{
        return <Job key={index} job={job}/>
      })}
      <JobsPagination limit={limit} setLimit={setLimit} hasNextPage={hasNextPage}/>
    </Container>
  );
}

export default App;
