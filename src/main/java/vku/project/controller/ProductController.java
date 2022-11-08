package vku.project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import vku.project.dto.DtoProduct;
import vku.project.entity.Account;
import vku.project.entity.Categories;
import vku.project.entity.Product;
import vku.project.service.CategoryService;
import vku.project.service.ProductService;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping(value = "/product")
@CrossOrigin("http://localhost:4200")
public class ProductController {
    @Autowired
    private ProductService productService;
    @Autowired
    private CategoryService categoryService;


    @GetMapping("/catagory")
    public ResponseEntity<List<Categories>> listCategories() {
        List<Categories> categories = this.categoryService.finAll();
        if (categories.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/list")
    public ResponseEntity<Page<Product>> listProduct(@PageableDefault(size = 5) Pageable pageable) {
        Page<Product> products = this.productService.finAll(pageable);
        if (products == null) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    @GetMapping("/listAllProduct")
    public ResponseEntity<List<Product>> listAllProduct(){
        List<Product> products = this.productService.findAllListProduct();
        if (products == null){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(products,HttpStatus.OK);
    }

    @GetMapping("/getInformation/{id}")
    public ResponseEntity<Product> getInforProduct(@PathVariable String id) {
        Product product = productService.findById(id);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PostMapping("/create")
    public ResponseEntity<Product> createProduct(@Valid @RequestBody DtoProduct product, BindingResult bindingResult) {
        System.out.println();
        if (!bindingResult.hasFieldErrors()) {
            this.productService.saveProduct(product);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);
    }

    @PutMapping("/edit")
    public ResponseEntity<Product> editProduct(@Valid @RequestBody DtoProduct product, BindingResult bindingResult) {
        System.out.println();
        if (!bindingResult.hasFieldErrors()) {
            if (product != null) {
                this.productService.updateProduct(product);
                return new ResponseEntity<>( HttpStatus.OK);
            }
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NOT_ACCEPTABLE);

    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable String id) {
        Product product = this.productService.findById(id);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        this.productService.delete(product.getProductId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
    @GetMapping("/search")
    public ResponseEntity<Page<Product>> searchProduct(@RequestParam("key") String name,@PageableDefault(size = 5) Pageable pageable){
        System.out.println();
        Page<Product> products = productService.searchByCategory(name,pageable);
        if (products.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
    @GetMapping("/listSearch")
    public ResponseEntity<List<Product>> listSearchProduct(@RequestParam("key") String name){
        System.out.println();
        List<Product> products = productService.searchListProduct(name);
        if (products.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
}
