export function Profile() {
  return (
    <div>
      <img src="/Unknown.png" alt="image" />
    </div>
  );
}

export function ImageTest() {
  const photo = "/jsimage.png";
  return (
    <>
      <img src={photo} alt="image" className="mt-4" />
    </>
  );
}

export default function Gallery() {
  return (
    <div className="flex gap-6 mb-4">
      <Profile />
      <Profile />
    </div>
  );
}
