package com.thebooksworld.config;

import com.thebooksworld.model.Book;
import com.thebooksworld.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private BookRepository bookRepository;

    @Override
    public void run(String... args) throws Exception {
        if (bookRepository.count() > 0) {
            return;
        }

        addSelfHelpBooks();
        addRomanceBooks();
        addTradingFinanceBooks();
        addMoreCategories();
    }

    private void addSelfHelpBooks() {
        Book book1 = new Book();
        book1.setTitle("The 7 Habits of Highly Effective People");
        book1.setAuthor("Stephen Covey");
        book1.setCategory("SELF-HELP");
        book1.setPrice(450.0);
        book1.setDescription("A powerful book about personal development and effectiveness");
        book1.setImageUrl("https://via.placeholder.com/200x300?text=7+Habits");
        book1.setQuantity(50);
        book1.setOnSale(true);
        book1.setSalePrice(350.0);

        Book book2 = new Book();
        book2.setTitle("Atomic Habits");
        book2.setAuthor("James Clear");
        book2.setCategory("SELF-HELP");
        book2.setPrice(500.0);
        book2.setDescription("Transform your life with tiny changes that create remarkable results");
        book2.setImageUrl("https://via.placeholder.com/200x300?text=Atomic+Habits");
        book2.setQuantity(60);
        book2.setOnSale(true);
        book2.setSalePrice(399.0);

        Book book3 = new Book();
        book3.setTitle("Think and Grow Rich");
        book3.setAuthor("Napoleon Hill");
        book3.setCategory("SELF-HELP");
        book3.setPrice(400.0);
        book3.setDescription("The classic book on achieving success and wealth");
        book3.setImageUrl("https://via.placeholder.com/200x300?text=Think+Grow+Rich");
        book3.setQuantity(45);
        book3.setOnSale(true);
        book3.setSalePrice(299.0);

        Book book4 = new Book();
        book4.setTitle("The Power of Now");
        book4.setAuthor("Eckhart Tolle");
        book4.setCategory("SELF-HELP");
        book4.setPrice(480.0);
        book4.setDescription("Transform your life through the power of presence");
        book4.setImageUrl("https://via.placeholder.com/200x300?text=Power+of+Now");
        book4.setQuantity(55);
        book4.setOnSale(true);
        book4.setSalePrice(375.0);

        bookRepository.save(book1);
        bookRepository.save(book2);
        bookRepository.save(book3);
        bookRepository.save(book4);
    }

    private void addRomanceBooks() {
        // Romance Books On Sale
        Book book1 = new Book();
        book1.setTitle("Pride and Prejudice");
        book1.setAuthor("Jane Austen");
        book1.setCategory("ROMANCE");
        book1.setPrice(350.0);
        book1.setDescription("A timeless tale of love and prejudice");
        book1.setImageUrl("https://via.placeholder.com/200x300?text=Pride+Prejudice");
        book1.setQuantity(40);
        book1.setOnSale(true);
        book1.setSalePrice(250.0);

        Book book2 = new Book();
        book2.setTitle("The Notebook");
        book2.setAuthor("Nicholas Sparks");
        book2.setCategory("ROMANCE");
        book2.setPrice(400.0);
        book2.setDescription("A heart-touching love story that transcends time");
        book2.setImageUrl("https://via.placeholder.com/200x300?text=The+Notebook");
        book2.setQuantity(50);
        book2.setOnSale(true);
        book2.setSalePrice(299.0);

        Book book3 = new Book();
        book3.setTitle("Outlander");
        book3.setAuthor("Diana Gabaldon");
        book3.setCategory("ROMANCE");
        book3.setPrice(550.0);
        book3.setDescription("A sweeping romance across time and continents");
        book3.setImageUrl("https://via.placeholder.com/200x300?text=Outlander");
        book3.setQuantity(35);
        book3.setOnSale(true);
        book3.setSalePrice(449.0);

        Book book4 = new Book();
        book4.setTitle("Me Before You");
        book4.setAuthor("Jojo Moyes");
        book4.setCategory("ROMANCE");
        book4.setPrice(420.0);
        book4.setDescription("A beautiful story about love and difficult choices");
        book4.setImageUrl("https://via.placeholder.com/200x300?text=Me+Before+You");
        book4.setQuantity(45);
        book4.setOnSale(true);
        book4.setSalePrice(320.0);

        bookRepository.save(book1);
        bookRepository.save(book2);
        bookRepository.save(book3);
        bookRepository.save(book4);
    }

    private void addTradingFinanceBooks() {
        // Trading & Finance
        Book book1 = new Book();
        book1.setTitle("The Intelligent Investor");
        book1.setAuthor("Benjamin Graham");
        book1.setCategory("TRADING & FINANCE");
        book1.setPrice(650.0);
        book1.setDescription("The best book for value investing principles");
        book1.setImageUrl("https://via.placeholder.com/200x300?text=Intelligent+Investor");
        book1.setQuantity(30);
        book1.setOnSale(false);

        Book book2 = new Book();
        book2.setTitle("A Random Walk Down Wall Street");
        book2.setAuthor("Burton Malkiel");
        book2.setCategory("TRADING & FINANCE");
        book2.setPrice(700.0);
        book2.setDescription("Understand stock market behavior and investing strategies");
        book2.setImageUrl("https://via.placeholder.com/200x300?text=Random+Walk");
        book2.setQuantity(25);
        book2.setOnSale(false);

        Book book3 = new Book();
        book3.setTitle("The Bogleheads' Guide to Investing");
        book3.setAuthor("Taylor Larson");
        book3.setCategory("TRADING & FINANCE");
        book3.setPrice(550.0);
        book3.setDescription("Simple yet effective guide to building wealth");
        book3.setImageUrl("https://via.placeholder.com/200x300?text=Bogleheads+Guide");
        book3.setQuantity(35);
        book3.setOnSale(false);

        Book book4 = new Book();
        book4.setTitle("Market Wizards");
        book4.setAuthor("Jack Schwager");
        book4.setCategory("TRADING & FINANCE");
        book4.setPrice(680.0);
        book4.setDescription("Interviews with legendary traders and their strategies");
        book4.setImageUrl("https://via.placeholder.com/200x300?text=Market+Wizards");
        book4.setQuantity(28);
        book4.setOnSale(false);

        bookRepository.save(book1);
        bookRepository.save(book2);
        bookRepository.save(book3);
        bookRepository.save(book4);
    }

    private void addMoreCategories() {
        // Technology & Programming
        Book book1 = new Book();
        book1.setTitle("Clean Code");
        book1.setAuthor("Robert Martin");
        book1.setCategory("TECHNOLOGY");
        book1.setPrice(700.0);
        book1.setDescription("A handbook of agile software craftsmanship");
        book1.setImageUrl("https://via.placeholder.com/200x300?text=Clean+Code");
        book1.setQuantity(40);
        book1.setOnSale(false);

        Book book2 = new Book();
        book2.setTitle("The Pragmatic Programmer");
        book2.setAuthor("Andrew Hunt");
        book2.setCategory("TECHNOLOGY");
        book2.setPrice(650.0);
        book2.setDescription("Your journey to mastery in programming");
        book2.setImageUrl("https://via.placeholder.com/200x300?text=Pragmatic+Programmer");
        book2.setQuantity(38);
        book2.setOnSale(false);

        // Mystery & Thriller
        Book book3 = new Book();
        book3.setTitle("The Girl on the Train");
        book3.setAuthor("Paula Hawkins");
        book3.setCategory("MYSTERY & THRILLER");
        book3.setPrice(450.0);
        book3.setDescription("A gripping psychological thriller");
        book3.setImageUrl("https://via.placeholder.com/200x300?text=Girl+on+Train");
        book3.setQuantity(55);
        book3.setOnSale(true);
        book3.setSalePrice(349.0);

        Book book4 = new Book();
        book4.setTitle("Gone Girl");
        book4.setAuthor("Gillian Flynn");
        book4.setCategory("MYSTERY & THRILLER");
        book4.setPrice(480.0);
        book4.setDescription("A twisted tale of marriage and deception");
        book4.setImageUrl("https://via.placeholder.com/200x300?text=Gone+Girl");
        book4.setQuantity(60);
        book4.setOnSale(true);
        book4.setSalePrice(369.0);

        // Education
        Book book5 = new Book();
        book5.setTitle("Educated");
        book5.setAuthor("Tara Westover");
        book5.setCategory("EDUCATION");
        book5.setPrice(550.0);
        book5.setDescription("A memoir about education, family, and identity");
        book5.setImageUrl("https://via.placeholder.com/200x300?text=Educated");
        book5.setQuantity(50);
        book5.setOnSale(false);

        Book book6 = new Book();
        book6.setTitle("The Learning Scientists");
        book6.setAuthor("Bjork & Bjork");
        book6.setCategory("EDUCATION");
        book6.setPrice(600.0);
        book6.setDescription("Understanding how we learn effectively");
        book6.setImageUrl("https://via.placeholder.com/200x300?text=Learning+Scientists");
        book6.setQuantity(35);
        book6.setOnSale(false);

        // Science & Nature
        Book book7 = new Book();
        book7.setTitle("Sapiens");
        book7.setAuthor("Yuval Noah Harari");
        book7.setCategory("SCIENCE & NATURE");
        book7.setPrice(700.0);
        book7.setDescription("A brief history of humankind");
        book7.setImageUrl("https://via.placeholder.com/200x300?text=Sapiens");
        book7.setQuantity(45);
        book7.setOnSale(false);

        Book book8 = new Book();
        book8.setTitle("A Brief History of Time");
        book8.setAuthor("Stephen Hawking");
        book8.setCategory("SCIENCE & NATURE");
        book8.setPrice(600.0);
        book8.setDescription("From the Big Bang to Black Holes");
        book8.setImageUrl("https://via.placeholder.com/200x300?text=Brief+History");
        book8.setQuantity(40);
        book8.setOnSale(false);

        bookRepository.save(book1);
        bookRepository.save(book2);
        bookRepository.save(book3);
        bookRepository.save(book4);
        bookRepository.save(book5);
        bookRepository.save(book6);
        bookRepository.save(book7);
        bookRepository.save(book8);
    }
}
