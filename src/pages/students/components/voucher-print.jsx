import React, { useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useReactToPrint } from "react-to-print";
class ComponentToPrint extends React.Component {
    render() {
        const { item = "item" } = this.props;
        return (
            <>
                <div id="hotspot-print-grid" style={{
                    fontSize: '1.4em',
                    fontFamily: 'sans-serif',
                }}>
                    <div style={
                        {
                            display: 'inline-block',
                            textAlign: 'center',
                            border: '1px solid #000',
                            width: '200px',
                            whiteSpace: 'nowrap',
                            marginTop: '10px',
                            marginLeft: '15px',
                            marginBottom: '10px'
                        }
                    }>
                        <p style={{
                            margin: 0,
                            fontWeight: 'bold',
                            fontSize: 'larger',
                        }}>{item['voucher_code']}</p>
                        <p style={{
                            margin: 0,
                            fontSize: 'small',
                            textDecoration: 'underline',
                            color: ' #666'
                        }}>Valid for {item['limit_uptime']} </p>
                        <p style={{
                            margin: 0,
                            fontSize: 'small',
                            color: '#666',
                        }}>{item['name']}</p>
                    </div>
                </div >
            </>
        );
    }
}

const VoucherPrint = ({ item }) => {
    const [printVisible, setPrintVisible] = useState(true)
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div>
            <ComponentToPrint ref={componentRef} hidden={printVisible} item={item} />

            <Button onClick={() => {

                handlePrint()
            }}>Print this out!</Button>
        </div>
    );
}



export default VoucherPrint;