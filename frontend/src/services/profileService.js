import api from "@/lib/api";

export const getProfile =
  async () => {
    const { data } =
      await api.get(
        "/profile"
      );

    return data.user;
  };

export const getWishlist =
  async () => {
    const { data } =
      await api.get(
        "/wishlist"
      );

    return data.wishlist;
  };

export const getReviews =
  async () => {
    const { data } =
      await api.get(
        "/profile/reviews"
      );

    return data.reviews;
  };

export const getRatings =
  async () => {
    const { data } =
      await api.get(
        "/profile/ratings"
      );

    return data.ratings;
  };

export const updateProfile =
  async (profileData) => {
    const formData =
      new FormData();

    formData.append(
      "username",
      profileData.username
    );

    if (
      profileData.avatar
    ) {
      formData.append(
        "avatar",
        profileData.avatar
      );
    }

    const { data } =
      await api.put(
        "/profile",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return data.user;
  };

export const changePassword = async (
  passwordData
) => {
  const { data } =
    await api.put(
      "/profile/change-password",
      passwordData
    );

  return data;
};