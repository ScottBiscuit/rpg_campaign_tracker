import { Link, useRouteError } from 'react-router-dom';
import { Card } from 'react-bootstrap';

export default  function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  if (error.response) {
    if (error.response.status === 401) {
      return (
        <>
          <Card className='text-center'>
            <Card.Img variant='top' src="https://http.cat/status/401.jpg" alt="Cat sitting outside door with no cats sign" />
            <Card.Body className='bg-success-subtle'>
              <Card.Title className='bg-success-subtle'>OOPS! You will need to log in to do that...</Card.Title>
                <Link to="/" className=''>Click here to go back to the homepage</Link>
            </Card.Body>
          </Card>
          
        </>
      );
    }
  }

  return (
    <>
    <Card className='text-center'>
            <Card.Img variant='top' src="./images/broken.jpg" alt="Facepalming meme - we broke something!" />
            <Card.Body className='bg-success-subtle'>
              <Card.Title className='bg-success-subtle'>OOPS! How did you manage to break that...?</Card.Title>
                <div>{error.statusText || error.message}</div>
                <Link to="/" className=''>Click here to go back to the homepage</Link>
            </Card.Body>
          </Card>
    </>
  );
}

