import { useTypedSelector } from "./use-typed-selector"

export const useCumulativeCode = (cellId: string): string => {
    return useTypedSelector((state) => {
        const { data, order } = state.cells
        const orderedCells = order.map(id => data[id])

        const showFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var show = (value) => {
            const root = document.querySelector('#root');
            console.log(typeof value)
            console.log('value', value)
            if (typeof value === 'object') {
                console.log('1')
                if (value.$$typeof && value.props) {
                    console.log('react')
                    _ReactDOM.render(value, root)
                } else {
                    console.log('3')
                    root.innerHTML = JSON.stringify(value);
                }
            } else {
                console.log('4')
                root.innerHTML = value;
            }
        }
        `
        const showFuncNoOp = `var show = () => {}`
        const cumulativeCode = []
        for (let c of orderedCells) {
            if (c.type === 'code') {
                if (c.id === cellId) {
                    cumulativeCode.push(showFunc)
                } else {
                    cumulativeCode.push(showFuncNoOp)
                }
                cumulativeCode.push(c.content)
            }
            if (c.id === cellId) {
                break
            }
        }
        return cumulativeCode
    }).join('\n')
}