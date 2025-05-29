export default function Categories({ categories }: { categories: string[] }) {
  return (
    <span className="ml-[4px]">
      تحت
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <span key={index} className="mx-[4px]">
            {category}
          </span>
        ))
      ) : (
        <span className="mx-[4px]">{categories}</span>
      )}
    </span>
  )
}
