import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ref, set, get, child } from 'firebase/database';
import { SortableItem } from './SortableItem';
import { db } from '../firebase';
import { ToolBar } from './ToolBar';

const initialItems = [
  { id: 'Header', content: 'This is a Header', type: 'header' },
  { id: 'Text', content: 'This is a Text block', type: 'text' },
  { id: 'Image', content: 'https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg', type: 'image' },
  { id: 'Button', content: 'Click Me', type: 'button' },
  { id: 'Footer', content: 'This is a Footer', type: 'footer' },
];

export function Layout() {
  const [items, setItems] = useState(initialItems);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addItem = (type) => {
    const newItem = {
      id: `${type}-${items.length}`,
      content: `This is a ${type}`,
      type: type.toLowerCase(),
    };
    setItems([...items, newItem]);
  };

  const saveLayout = () => {
    set(ref(db, 'layouts/default'), { items });
  };

  const loadLayout = () => {
    get(child(ref(db), 'layouts/default')).then((snapshot) => {
      if (snapshot.exists()) {
        setItems(snapshot.val().items);
      } else {
        console.log('No data available');
      }
    });
  };

  const publishPage = () => {
    const newWindow = window.open();
    const pageContent = items.map(item => {
      switch (item.type) {
        case 'header':
          return `
            <h1 style="
              color: #002d72; 
              text-align: center;
              font-family: 'Helvetica, Arial, sans-serif';
              background-color: #ffffff; 
              padding: 30px;
              border-bottom: 1px solid #000000; 
              margin: 0;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              border: 1px solid #000000;
            ">
              ${item.content}
            </h1>`;
        case 'text':
          return `
            <p style="
              color: #333333; 
              font-family: 'Helvetica, Arial, sans-serif';
              font-size: 20px;
              line-height: 1.8;
              padding: 20px;
              background-color: #ffffff; 
              margin: 20px auto;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              max-width: 750px;
              text-align: center;
              border: 1px solid #000000; 
            ">
              ${item.content}
            </p>`;
        case 'image':
          return `
            <div style="
              text-align: center;
              margin: 20px auto;
              border: 1px solid #000000; 
            ">
              <img src="https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg" alt="content" style="
                width: 50%;
                height: 150px; 
                object-fit: cover; 
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                border: 1px solid #000000; 
              " />
            </div>`;
        case 'button':
          return `
            <div style="
              text-align: center;
              margin: 20px auto;
            ">
              <button style="
                background-color: #002d72; 
                color: white;
                padding: 15px 25px;
                font-size: 18px;
                border: none; 
                border-radius: 10px;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                transition: background-color 0.3s ease;
              ">
                ${item.content}
              </button>
            </div>`;
        case 'footer':
          return `
            <footer style="
              color: #ffffff; 
              text-align: center;
              font-family: 'Helvetica, Arial, sans-serif';
              background-color: #002d72; 
              padding: 20px;
              margin-top: 20px;
              border: 1px solid #000000; 
            ">
              ${item.content}
            </footer>`;
        default:
          return `
            <p style="
              color: #333333; 
              font-family: 'Helvetica, Arial, sans-serif';
              font-size: 20px;
              line-height: 1.8;
              padding: 20px;
              background-color: #ffffff; 
              margin: 20px auto;
              border-radius: 10px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              max-width: 750px;
              text-align: center;
              border: 1px solid #000000; 
            ">
              ${item.content}
            </p>`;
      }
    }).join('<br>');

    newWindow.document.write(`
      <html>
        <head>
          <style>
            body {
              background-color: #ffffff; 
              margin: 0;
              padding: 0;
              font-family: 'Helvetica, Arial, sans-serif';
              color: #333333; 
            }
            h1, p, img {
              border: 1px solid #000000; 
            }
            h1:hover, p:hover, button:hover {
              color: #002d72; 
            }
            button:hover {
              background-color: #001f4d; 
            }
          </style>
        </head>
        <body>
          ${pageContent}
        </body>
      </html>
    `);
};

  return (
    <div>
      <ToolBar addItem={addItem} />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={items.map(item => item.id)} strategy={verticalListSortingStrategy}>
          {items.map((item, index) => (
            <SortableItem key={index} id={item.id}>
              <div style={{ padding: '10px', backgroundColor: '#fff', color: 'black', borderRadius: '4px', marginBottom: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                {item.type === 'image' ? <img src="https://mtek3d.com/wp-content/uploads/2018/01/image-placeholder-500x500.jpg" alt="content" style={{ width: '50%', height: '150px', objectFit: 'cover', display: 'block', margin: '10px auto' }} /> : item.content}
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
      <div style={{ marginTop: '20px' }}>
        <button onClick={saveLayout} style={{ marginRight: '10px', backgroundColor: '#4CAF50', color: 'white', padding: '10px', borderRadius: '5px' }}>Save Layout</button>
        <button onClick={loadLayout} style={{ marginRight: '10px', backgroundColor: '#2196F3', color: 'white', padding: '10px', borderRadius: '5px' }}>Load Layout</button>
        <button onClick={publishPage} style={{ backgroundColor: '#f44336', color: 'white', padding: '10px', borderRadius: '5px' }}>Publish</button>
      </div>
    </div>
  );
}
