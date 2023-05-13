import Book from "../components/StorybookGenerator"

export default async function Picturebook() {
    return (
        <div className="my-12 p-2 text-black bg-cyan-600">
          <Book endpoint="http://localhost:4000" />
        </div>
    )
  }