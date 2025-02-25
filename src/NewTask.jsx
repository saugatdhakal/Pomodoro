function NewTask({ toggleCard }) {
  return (
    <div onClick={toggleCard} className="flex justify-center mt-10">
      <h1 className="text-2xl font-bold hover:text-blue-500 cursor-pointer hover:bg-blue-100 rounded-md p-3">
        Let's Take a challenge
      </h1>
    </div>
  );
}

export default NewTask;
