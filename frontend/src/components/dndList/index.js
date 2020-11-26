import React from 'react';
import withDnd from './withDnd';
import './index.less';


const dndList = (props) => {
    const [ items, setItems ] = React.useState(props.items);
    const moveItem = React.useCallback((dragIndex, hoverIndex) => {
        const dragItem = items[dragIndex];
        let newItems = new Array(...items);
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, dragItem);
        setItems(newItems);     
    }, [items]);
    return <ul className={props.className}>
        { items.map((item, i) => (
            <ItemWithDnd item={item} moveItem={moveItem} key={i} index={i}/>
        )) }
    </ul>
};

const DndItem = React.forwardRef(({ item }, ref) => {
    return (
        <li className="dndList-li" ref={ref}>
            <h3 className="dndList-fio">{item.fio}</h3>
            <img src={item.photo} className="dndList-photo" />
            <ul className="horizontalList">
                {item.abilities.map((ability, i) => (
                    <li className="horizontalList-li" key={ability+i}>{ability}</li>
                ))}
            </ul>
        </li>
    )
});

const ItemWithDnd = withDnd(DndItem, 'item');

export default dndList;