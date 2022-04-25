import { React } from 'react'
import { Col, Button } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'
import './card.css'

const Menus = ({ menu }) => {

    return (

        <Col md={2} xs={6} className={'mb-4'}>

            <div className="card">
                <div className="imgBox">
                    <img src={menu.image} class="mouse" alt='' />
                </div>
                <div className="contentBox">
                    <h3 className='product-name'>{menu.name}</h3>
                    <h2 className="price"> Rp.{numberWithCommas(menu.price)}</h2>
                    <h2 className="price"> Stock ({menu.quantity})</h2>
                     <Button className='buy'>BUY</Button>
                    
                </div>
            </div>

        </Col>
    )
}

export default Menus