import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import './index.less';

const TinderLikeContainer = (props) => {
    const [ items, setItems ] = React.useState(props.items);
    const moveItem = React.useCallback((dragIndex, accepted) => {
        // accepted: if right - accept, if left - decline
        let newItems = new Array(...items);
        let spliced = newItems.splice(dragIndex, 1);
        newItems.push({...items[dragIndex], accepted});
        setItems(newItems);
    }, [items])
    return renderTinderLikeContainer(items, moveItem);
};

const renderTinderLikeContainer = (items, moveItem) => (
    <ul className="tinderlikeContainer">
        { items.map((item, i) => (
            <TinderLikeItemsWithTinderDnd item={item} moveItem={moveItem} key={i} index={i}/>
        )) }
    </ul>
);

const TinderLikeItems = React.forwardRef(({ item, index }, ref) => {
    const textColor = item.accepted !== undefined ?
                      item.accepted ? 'green' : 'red'
                      : 'black'
    return (
    <li className="item-li" ref={ref} style={{ zIndex: -index }}>
        <h3 className="item-fio" style={{ color: textColor}}>{item.fio}</h3>
        <img src={item.photo} className="item-photo" />
        <ul className="item-list">
            {item.abilities.map((ability, i) => (
                <li className="item-list-li" key={ability+i}>{ability}</li>
            ))}
        </ul>
    </li>
    )
});

const withTinderDnd = (Wrapped, type) => (props) => {
    const { moveItem, index } = props;
    const ref = React.useRef(null);

    const [, drag] = useDrag({
        item: {type, index},
    });
    const [, drop] = useDrop({
        accept: type,
        hover(item, monitor) {
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex != hoverIndex) return;
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const differenceFromInitialOffset = monitor.getDifferenceFromInitialOffset();
            let color;
            if (differenceFromInitialOffset.x - hoverBoundingRect.width/4 > 0) {
                color = '#EF5350';
            } else if (differenceFromInitialOffset.x + hoverBoundingRect.width/4 < 0) {
                color = '#66BB6A';
            }
            ref.current.style.transform = `translate(${differenceFromInitialOffset.x}px)`;
            ref.current.style.opacity = 100 / Math.abs(differenceFromInitialOffset.x);
            ref.current.style.backgroundColor = color;
        },
        drop(item, monitor) {
            const hoverBoundingRect = ref.current.getBoundingClientRect();
            const differenceFromInitialOffset = monitor.getDifferenceFromInitialOffset();
            ref.current.style.transform = `translateX(0)`;
            ref.current.style.opacity = 1;
            ref.current.style.backgroundColor = 'white';
            if (Math.abs(differenceFromInitialOffset.x) < hoverBoundingRect.width/2) return;
            // if right - accept, if left - decline
            moveItem(item.index, differenceFromInitialOffset.x > 0);
        }
    });
    drag(drop(ref));
    return <Wrapped {...props} ref={ref} />
};

const TinderLikeItemsWithTinderDnd = withTinderDnd(TinderLikeItems, 'tinderLike')

export default TinderLikeContainer;