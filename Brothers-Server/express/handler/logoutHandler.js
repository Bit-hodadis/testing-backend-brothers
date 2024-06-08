const logOut = (req, res) => {
  try {
    console.log(req.cookies, "refrsh");
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
  } catch (error) {
    console.log(error, "Logout error");
  } finally {
    return res.status(200).json({ message: "succes" });
  }
};

module.exports = { logOut };
