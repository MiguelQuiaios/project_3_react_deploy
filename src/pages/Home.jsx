
import React from 'react';
import Figure from 'react-bootstrap/Figure';

function Home() {
  return (
    <div>
      <Figure>
      <Figure.Image
        width={1500}
        height={400}
        alt="171x180"
        src="https://knowledge.wharton.upenn.edu/wp-content/uploads/2016/04/network-connections.jpg"
      />
      <Figure.Caption>
        Join Us and find Pople with the same interes as you!!
      </Figure.Caption>
    </Figure>
  
     
    </div>
  );
}

export default Home;