import spinner from '../../assets/spinner.gif';

export default function Spinner() {
  return (
    <div className="w-100">
      <img
        width={50}
        src={spinner}
        alt="Loading.."
        className="text-center mx-auto"
      />
    </div>
  );
}
