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
        // Check if books already exist
        if (bookRepository.count() > 0) {
            return;
        }

        // Add dummy books
        addSelfHelpBooks();
        addRomanceBooks();
        addTradingFinanceBooks();
        addMoreCategories();
    }

    private void addSelfHelpBooks() {
        // Self-Help Books On Sale
        Book book1 = new Book(null, "The 7 Habits of Highly Effective People",
                "Stephen Covey", "SELF-HELP", 450.0,
                "A powerful book about personal development and effectiveness",
                "https://via.placeholder.com/200x300?text=7+Habits", 50, true, 350.0);

        Book book2 = new Book(null, "Atomic Habits",
                "James Clear", "SELF-HELP", 500.0,
                "Transform your life with tiny changes that create remarkable results",
                "https://via.placeholder.com/200x300?text=Atomic+Habits", 60, true, 399.0);

        Book book3 = new Book(null, "Think and Grow Rich",
                "Napoleon Hill", "SELF-HELP", 400.0,
                "The classic book on achieving success and wealth",
                "https://via.placeholder.com/200x300?text=Think+Grow+Rich", 45, true, 299.0);

        Book book4 = new Book(null, "The Power of Now",
                "Eckhart Tolle", "SELF-HELP", 480.0,
                "Transform your life through the power of presence",
                "https://via.placeholder.com/200x300?text=Power+of+Now", 55, true, 375.0);

        bookRepository.save(book1);
        bookRepository.save(book2);
        bookRepository.save(book3);
        bookRepository.save(book4);
    }

    private void addRomanceBooks() {
        // Romance Books On Sale
        Book book1 = new Book(null, "Pride and Prejudice",
                "Jane Austen", "ROMANCE", 350.0,
                "A timeless tale of love and prejudice",
                "https://via.placeholder.com/200x300?text=Pride+Prejudice", 40, true, 250.0);

        Book book2 = new Book(null, "The Notebook",
                "Nicholas Sparks", "ROMANCE", 400.0,
                "A heart-touching love story that transcends time",
                "https://via.placeholder.com/200x300?text=The+Notebook", 50, true, 299.0);

        Book book3 = new Book(null, "Outlander",
                "Diana Gabaldon", "ROMANCE", 550.0,
                "A sweeping romance across time and continents",
                "https://via.placeholder.com/200x300?text=Outlander", 35, true, 449.0);

        Book book4 = new Book(null, "Me Before You",
                "Jojo Moyes", "ROMANCE", 420.0,
                "A beautiful story about love and difficult choices",
                "https://via.placeholder.com/200x300?text=Me+Before+You", 45, true, 320.0);

        bookRepository.save(book1);
        bookRepository.save(book2);
        bookRepository.save(book3);
        bookRepository.save(book4);
    }

    private void addTradingFinanceBooks() {
        // Trading & Finance
        Book book1 = new Book(null, "The Intelligent Investor",
                "Benjamin Graham", "TRADING & FINANCE", 650.0,
                "The best book for value investing principles",
                "https://via.placeholder.com/200x300?text=Intelligent+Investor", 30, false, null);

        Book book2 = new Book(null, "A Random Walk Down Wall Street",
                "Burton Malkiel", "TRADING & FINANCE", 700.0,
                "Understand stock market behavior and investing strategies",
                "https://via.placeholder.com/200x300?text=Random+Walk", 25, false, null);

        Book book3 = new Book(null, "The Bogleheads' Guide to Investing",
                "Taylor Larson", "TRADING & FINANCE", 550.0,
                "Simple yet effective guide to building wealth",
                "https://via.placeholder.com/200x300?text=Bogleheads+Guide", 35, false, null);

        Book book4 = new Book(null, "Market Wizards",
                "Jack Schwager", "TRADING & FINANCE", 680.0,
                "Interviews with legendary traders and their strategies",
                "https://via.placeholder.com/200x300?text=Market+Wizards", 28, false, null);

        bookRepository.save(book1);
        bookRepository.save(book2);
        bookRepository.save(book3);
        bookRepository.save(book4);
    }

    private void addMoreCategories() {
        // Technology & Programming
        Book book1 = new Book(null, "Clean Code",
                "Robert Martin", "TECHNOLOGY", 700.0,
                "A handbook of agile software craftsmanship",
                "https://via.placeholder.com/200x300?text=Clean+Code", 40, false, null);

        Book book2 = new Book(null, "The Pragmatic Programmer",
                "Andrew Hunt", "TECHNOLOGY", 650.0,
                "Your journey to mastery in programming",
                "https://via.placeholder.com/200x300?text=Pragmatic+Programmer", 38, false, null);

        // Mystery & Thriller
        Book book3 = new Book(null, "The Girl on the Train",
                "Paula Hawkins", "MYSTERY & THRILLER", 450.0,
                "A gripping psychological thriller",
                "https://via.placeholder.com/200x300?text=Girl+on+Train", 55, true, 349.0);

        Book book4 = new Book(null, "Gone Girl",
                "Gillian Flynn", "MYSTERY & THRILLER", 480.0,
                "A twisted tale of marriage and deception",
                "https://via.placeholder.com/200x300?text=Gone+Girl", 60, true, 369.0);

        // Education
        Book book5 = new Book(null, "Educated",
                "Tara Westover", "EDUCATION", 550.0,
                "A memoir about education, family, and identity",
                "https://via.placeholder.com/200x300?text=Educated", 50, false, null);

        Book book6 = new Book(null, "The Learning Scientists",
                "Bjork & Bjork", "EDUCATION", 600.0,
                "Understanding how we learn effectively",
                "https://via.placeholder.com/200x300?text=Learning+Scientists", 35, false, null);

        // Science & Nature
        Book book7 = new Book(null, "Sapiens",
                "Yuval Noah Harari", "SCIENCE & NATURE", 700.0,
                "A brief history of humankind",
                "https://via.placeholder.com/200x300?text=Sapiens", 45, false, null);

        Book book8 = new Book(null, "A Brief History of Time",
                "Stephen Hawking", "SCIENCE & NATURE", 600.0,
                "From the Big Bang to Black Holes",
                "https://via.placeholder.com/200x300?text=Brief+History", 40, false, null);

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
