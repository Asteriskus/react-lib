import React from 'react';
import { useDrop, useDrag } from 'react-dnd';
import './index.less';
import employee from './employee';

const dndList = () => {
    const [ items, setItems ] = React.useState(employee);
    const moveItem = React.useCallback((dragIndex, hoverIndex) => {
        const dragItem = items[dragIndex];
        let newItems = new Array(...items);
        newItems.splice(dragIndex, 1);
        newItems.splice(hoverIndex, 0, dragItem);
        setItems(newItems);
        
    }, [items]);
    return <ul className="dndList">
        { items.map((item, i) => <DndItem card={item} moveItem={moveItem} key={i} index={i}/>) }
    </ul>
};

const DndItem = ({ card, moveItem, index }) => {
    const ref = React.useRef(null);
    const [,drop] = useDrop({
        accept: 'card',
        hover(item, monitor) {
            if (!ref.current) return;
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientX = clientOffset.x - hoverBoundingRect.left;
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX && hoverClientY < hoverMiddleY) return;

            moveItem(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        item: {...card, type: 'card', index},
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    //const opacity = isDragging ? 0 : 1;
    React.useEffect(() => ref.current.style.opacity = 1, []);   
    drag(drop(ref));
    return (
        <li className="dndList-li" ref={ref} style={{ opacity:0, transition: 'opacity .4s ease-in-out' }}>
            <h3 className="dndList-fio">{card.fio}</h3>
            <img src={card.photo} className="dndList-photo" />
            <ul className="horizontalList">
                {card.abilities.map((ability, i) => (
                    <li className="horizontalList-li" key={ability+i}>{ability}</li>
                ))}
            </ul>
        </li>
    )
};

export default dndList;