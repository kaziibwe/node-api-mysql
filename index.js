
import express from 'express';
import morgan from 'morgan'

const app = express();
import { getall, post, getSingle, updateUser, deleteUser } from './controllers/UserController.js';

const router = express.Router();

app.use(express.json());



app.listen(5000, () => {
  console.log("Server listening in http://localhost:5000")
})
app.use(
  morgan('short')

  );

  app.use((req, res, next) => {
    // Log request details
    console.log(`IP: ${req.ip}`);
    console.log(`Path: ${req.originalUrl}`);
    console.log(`User-Agent: ${req.headers['user-agent']}`);
    console.log(`Device Fingerprint: ${req.headers['x-device-fingerprint'] || 'unknown'}`);
  
    // Continue to the next middleware
    next();
  });
router.route('/users')
  .get(getall)
  .post(post);


// Mount the router to the app
router.route('/user/:id')
  .get(getSingle);

router.route('/userUpdate/:id')
  .patch(updateUser);


router.route('/userDelete/:id')
  .delete(deleteUser);



app.use('/', router);

// app.use((req,res)=>{
//   res.status(404).render('404',{title:'404'});
// })
