import { observer } from 'mobx-react-lite'
import React, { useContext } from 'react'
import { Context } from '..'
import { Card, Row } from 'react-bootstrap'

const BrandBar = observer(() => {
    const { device } = useContext(Context)
    return (
        <Row className='d-flex flex-wrap'>
            {device.brands.map(brand =>
                <Card
                    key={brand.id}
                    className='p-3'
                    style={{
                        cursor: 'pointer',
                        border: brand.id === device.selectedBrand?.id ? '2px solid red' : '1px solid lightgray',
                        width: '150px', // фиксированная ширина
                        margin: '5px',  // отступы между карточками
                        textAlign: 'center'
                    }}
                    onClick={() => device.setSelectedBrand(brand)}
                >
                    {brand.name}
                </Card>
            )}
        </Row>
    )
})

export default BrandBar
