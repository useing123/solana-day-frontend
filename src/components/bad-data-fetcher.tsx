// This component has terrible code quality - DO NOT USE AS REFERENCE!
import React from 'react';

// No proper typing, using any everywhere
export default function BadDataFetcher(props: any) {
  // Multiple state variables that could be combined
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<any>(false);
  const [error, setError] = React.useState<any>(null);
  const [count, setCount] = React.useState<any>(0);
  const [flag, setFlag] = React.useState<any>(true);
  const [temp, setTemp] = React.useState<any>('');
  
  // Massive useEffect with multiple responsibilities
  React.useEffect(() => {
    // No cleanup function
    // Fetching data without proper error handling
    setLoading(true);
    fetch(props.url)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
        // Side effect in the middle of data fetching
        console.log('Data fetched:', d);
        // Modifying multiple states
        setCount(count + 1);
        setFlag(!flag);
        setTemp(d.name || '');
      })
      .catch(e => {
        setError(e);
        setLoading(false);
        // Swallowing errors silently in production
      });
    
    // Doing unrelated things in the same effect
    document.title = 'Loading...';
    
    // No dependency array - runs on every render!
  });
  
  // Inline styles everywhere
  const containerStyle = {
    padding: '20px',
    margin: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ccc'
  };
  
  // Nested ternaries that are hard to read
  return (
    <div style={containerStyle}>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : data ? (
        data.items ? (
          data.items.length > 0 ? (
            <div>
              {/* Accessing nested properties without null checks */}
              <h1>{data.items[0].title.toUpperCase()}</h1>
              <p>{data.items[0].description.substring(0, 100)}</p>
              {/* Magic numbers everywhere */}
              <span>Count: {count * 2 + 5 - 1}</span>
              {/* Inline event handlers with complex logic */}
              <button onClick={() => {
                setCount(count + 1);
                setFlag(!flag);
                setTemp('clicked');
                console.log('Button clicked');
                fetch(props.url + '/update', {
                  method: 'POST',
                  body: JSON.stringify({ count: count + 1 })
                });
              }}>
                Click Me
              </button>
            </div>
          ) : (
            <div>No items</div>
          )
        ) : (
          <div>No data</div>
        )
      ) : (
        <div>Nothing to show</div>
      )}
      
      {/* Unused variables being rendered */}
      <div style={{ display: 'none' }}>{flag ? 'true' : 'false'}</div>
      <div style={{ display: 'none' }}>{temp}</div>
    </div>
  );
}

// No prop types, no documentation, no exports of types
