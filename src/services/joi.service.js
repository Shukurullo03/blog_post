import Joi from "joi";
class JoiService {
  constructor() {
    this.Joi = Joi;
  }
  async validateUserData(data) {
    const payload = this.Joi.object({
      firstName: this.Joi.string().min(5).max(32).required(),
      lastName: this.Joi.string().min(5).max(32).required(),
      email: this.Joi.string().min(5).max(32).required(),
      age: this.Joi.number().integer().min(1).max(100).required(),
      password: this.Joi.string().min(8).max(32).required(),
       role: Joi.string().valid("user", "admin").default("user"), 
    });
    await payload.validateAsync(data);
  }
}
export default JoiService;
