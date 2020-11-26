import React from 'react';
import { useDrop, useDrag } from 'react-dnd';

const withDnd = (Wrapped, type) => (props) => {
    const { item, moveItem, index } = props;
    const ref = React.useRef(null);
    const [,drop] = useDrop({
        accept: type,
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
    const [, drag] = useDrag({
        item: {type, index},
        
    });
    //const opacity = isDragging ? 0 : 1;
    drag(drop(ref));
    return <Wrapped {...props} ref={ref}/>
};

export default withDnd;