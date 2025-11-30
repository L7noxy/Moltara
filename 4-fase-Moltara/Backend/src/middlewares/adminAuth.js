export function adminAuth(req, res, next) {
  if (!req.session || !req.session.adminId) {
    return res.status(401).json({ message: "Não autorizado." });
  }

  next();
}