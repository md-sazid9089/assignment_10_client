const AddArtwork = () => {
  return (
    <div className="container-custom py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold gradient-text mb-4">
            Add New Artwork
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Share your creative masterpiece with the world
          </p>
        </div>

        <div className="card p-8">
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-semibold mb-4">Add Artwork Form</h3>
            <div className="badge badge-primary badge-lg">
              Form Coming Soon
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4 max-w-md mx-auto">
              This is a protected route. Form will include fields for image URL, title, category, 
              medium, description, dimensions, price, and visibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddArtwork
