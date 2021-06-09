import { useEffect, useState } from "react";
import ImageCard from "./Components/ImageCard";
import ImageSearch from "./Components/ImageSearch";

function App() {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [term, setTerm] = useState("");

    useEffect(() => {
        fetch(
            `https://pixabay.com/api/?key=22004522-b699d2054513c067e6675ee87&q=${term}&image_type=photo&pretty=true`
        )
            .then((res) => res.json())
            .then((data) => {
                setImages(data.hits);
                setIsLoading(false);
            })
            .catch((err) => console.log(err));
    }, [term]);
    return (
        <div className="container mx-auto">
            <ImageSearch searchText={(text) => setTerm(text)} />
            {!isLoading && images.length === 0 && (
                <h1 className="text-5xl text-center max-auto mt-32 text-blue-500">
                    Image Not Found
                </h1>
            )}

            {isLoading ? (
                <h1 className="text-6xl text-center max-auto mt-32 text-blue-500">
                    Loading...
                </h1>
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {images.map((image) => (
                        <ImageCard key={image.id} image={image} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default App;
