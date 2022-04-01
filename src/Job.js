
import React from 'react'
import { Badge, Card,Button } from 'react-bootstrap'

export default function Job({job}) {
    const a = (dis)=>{
        return dis
    }
  return (
    <Card>
        <Card.Body>

            <div className='d-flex justify-content-between'>
                <div>
                <Card.Title>
                    {job.title} - <span className="text-muted font-weight-light">{job.company_name}</span>
                </Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                    {new Date(job.publication_date).toLocaleDateString()}
                </Card.Subtitle>
                {job.tags.map(((tag ,index)=>{
                   return <span key={index}className="mr-2"> <Badge bg="success" >{tag}</Badge></span>
                }))}
                <div className="mt-3"> <Button onClick={()=>window.open(job.url)}>Job Url</Button>
  </div>
                </div>
                <img className="d-none d-md-block" height="50" alt={job.company_name} src={job.company_logo}/>
            </div>
            
        </Card.Body>
    </Card>
  )
}
