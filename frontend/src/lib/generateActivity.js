export const generateActivity = ({
  wishlist = [],
  reviews = [],
  ratings = [],
}) => {
  const activities = [];

  wishlist.forEach((item) => {
    activities.push({
      _id: item._id,
      type: "wishlist",
      title: "Added destination to wishlist",
      description: item.destination?.name,
      createdAt: item.createdAt,
    });
  });

  reviews.forEach((review) => {
    activities.push({
      _id: review._id,
      type: "review",
      title: "Reviewed destination",
      description:
        review.destination?.name,
      createdAt: review.createdAt,
    });
  });

  ratings.forEach((rating) => {
    activities.push({
      _id: rating._id,
      type: "rating",
      title: `Rated ${rating.rating} Stars`,
      description:
        rating.destination?.name,
      createdAt: rating.createdAt,
    });
  });

  return activities.sort(
    (a, b) =>
      new Date(b.createdAt) -
      new Date(a.createdAt)
  );
};