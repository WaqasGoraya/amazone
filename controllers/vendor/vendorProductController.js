import productModel from "../../models/productModel.js";
import categoryModel from "../../models/categoryModel.js";
class vendorProductController {
    static allProduct = async (req,res) => {
        try {
           
            const user =  req.session.user
              const user_id = user._id;
            const Products = await productModel.find({user:user_id}).populate('category');
            res.render("vendor/pages/products/products",{products:Products})
        } catch (error) {
            console.log("Error",error)
        }
    }
    static addProduct = async (req,res) => {
        try {
            const category= await categoryModel.find({})
            res.render("vendor/pages/products/addProduct",{category:category})
        } catch (error) {
            console.log("Error",error)
        }
    }
    static storeProduct = async (req,res) => {
        try {
            const user =  req.session.user
              const user_id = user._id;
                

            const {pname,pprice,qty,pdesc,p_cat} = req.body
               var img = req.file
                if(!img){
                    req.flash('fail','Please upload Image!')
                    res.redirect('/vendor/addproduct')
                }
                else{
                    img = req.file.filename
                }
                
                if(!pname || !pprice || !p_cat || !qty )
                {
                    req.flash('fail','Please Fill All Fields!')
                    res.redirect('/vendor/addproduct')
                }
                else
                {
                    const ProductDoc = productModel ({
                        name: pname,
                        price: pprice,
                        category:p_cat,
                        stock:qty,
                        image:img,
                        desc:pdesc,
                        user:user_id

                    })
                    await ProductDoc.save()
                    req.flash('success','Product Added Successfully!')
                    res.redirect('/vendor/products')
                }
        } catch (error) {
            console.log("Error",error)
        }
    }
    static editProduct = async (req,res) => {
        try {
            const id = req.params.id
           
            const product = await productModel.findById({_id:id})
            const category = await categoryModel.find({})
            console.log(product);
            res.render("vendor/pages/products/editProducts",{product:product,category:category})
        } catch (error) {
            console.log("Error",error)
        }
    }
    static updateProduct = async (req,res) => {
        try {
            
        } catch (error) {
            console.log("Error",error)
        }
    }
    static deleteProduct = async (req,res) => {
        try {
                 const id = req.params.id
                    const product = await productModel.findById(id)
                    if(product.image){        
                    await fs.unlink(`public/uploads/${product.image}`,(error)=>{
                    if(error){
                        console.log(error);
                    }else{
                        console.log("deleted");
                    }
                })
            }
                    const product_delete = await productModel.findByIdAndDelete(id)
                    if(product_delete)
                    {
                        req.flash('success','Product Deleted Successfully!!')
                        res.redirect('/vendor/products')
                    }
                    else{
                        req.flash('fail','Something went Wrong Please Try Again!!')
                        res.redirect('/products')
                    }
        } catch (error) {
            console.log("Error",error)
        }
    }
}
export default vendorProductController;