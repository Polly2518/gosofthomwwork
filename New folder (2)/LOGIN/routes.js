const validateLogin = body => {
    if (!body.username || !body.password)
      throw new Error("Please filled username or password !");
  };
  
  router.route("/login").post(async (req, res) => {
    validateLogin(req.body);
  });

  const validateLogin = body => {
    if (!body.username || !body.password)
      throw new Error("Please filled username or password !");
  };
  
  router.route("/login").post(async (req, res) => {
    validateLogin(req.body);
    const { username, password } = req.body;
    const _user = await userService.getUserByUsername(username);
  
    if (_user) {
      if (bcryptUtils.comparePassword(password, _user.password)) {
        const _userInfo = await userService.getUserWithoutPassword(_user._id);
  
        const token = jwt.sign(_userInfo, config.secret, {
          expiresIn: "1d"
        });
  
        return res.json({ success: true, token: token });
      }
    }
    return res.json({
      success: false,
      message: "Username or password is incorrect !"
    });
  });