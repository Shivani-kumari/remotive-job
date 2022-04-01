import React from 'react'
import { Form,Col ,Row} from 'react-bootstrap'

export default function SearchForm({parms,onParamChange}) {
  return (
   <Form className="mb-4">
<Row>
    <Form.Label>
        <Form.Group as= {Col}>
            <Form.Label>
                Search according to title
            </Form.Label>
            <Form.Control onChange={onParamChange}
            value={parms.search} name="search" type="text"
            />
            <Form.Label>
            company name
            </Form.Label>
            <Form.Control onChange={onParamChange}
            value={parms.search} name="company_name" type="text"
            />
        </Form.Group>
    </Form.Label>
</Row>
   </Form>
  )
}
