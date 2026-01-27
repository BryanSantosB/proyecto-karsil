export default function ButtonAction({ children, ...props }) {
  return (
    <div className="text-center mt-12">
      <button className="bg-primary-primary hover:bg-primary-light text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105">
        {props.texto}
      </button>
    </div>
  );
}
