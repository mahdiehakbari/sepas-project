import Card from '@/sharedComponent/ui/Card/Card';

const MyPlanes = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-6'>
      <Card
        title='طرح دندان پزشکی'
        amountReceived='100 تومان'
        cost='80 تومان'
        remaining='20 تومان'
        borderColor='bg-blue-400'
      />
    </div>
  );
};

export default MyPlanes;
