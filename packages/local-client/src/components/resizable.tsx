import { useEffect, useState } from 'react'
import {ResizableBox, ResizableBoxProps} from 'react-resizable'
import './resizable.css'

interface ResizableProps {
    direction: "horizontal" | "vertical";
    children?: React.ReactNode;
}

const Resizable: React.FC<ResizableProps> = ({direction, children}) => {
    let [innerWidth, setInnerWidth] = useState<number>(window.innerWidth)
    let [innerHeight, setInnerHeight] = useState<number>(window.innerHeight)
    let [width, setWidth] = useState<number>(window.innerWidth * 0.75)

    let resizableProps: ResizableBoxProps;

    useEffect(() => {
        let timer: any;
        const listener = () => {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                setInnerWidth(window.innerWidth)
                setInnerHeight(window.innerHeight)
            }, 100)
        }
        window.addEventListener('resize', listener)

        return () => {
            window.removeEventListener('resize', listener)
        }
    }, [])

    if (direction === 'horizontal') {
        resizableProps = {
            className: 'resize-horizontal',
            maxConstraints: [innerWidth * 0.2, Infinity],
            minConstraints: [innerWidth * 0.75, Infinity],
            height: Infinity,
            width:width,
            resizeHandles: ['e'],
            onResizeStop: (event, data) => {
                setWidth(data.size.width)
            }
        }
    } else {
        resizableProps = {
            maxConstraints: [Infinity, innerHeight * 0.9],
            minConstraints: [Infinity, 24],
            height: 200,
            width: Infinity,
            resizeHandles: ['s']
        }
    }

    return <ResizableBox {...resizableProps}>
        {children}
    </ResizableBox>
}

export default Resizable