var Blog = Backbone.Model.extend({
	defaults: {
		author: '',
		title: '',
		url: ''
	}
});

var Blogs = Backbone.Collection.extend({
	url: 'http://localhost:3000/api/blogs'
});

var blogs = new Blogs();


var BlogView = Backbone.View.extend({
	model: new Blog(),
	tagName: 'tr',
	initialize: function() {
		this.template = _.template($('.blogs-list-template').html());
		this.template1=_.template($('.blogs-list-template1').html());
	},
	events: {
		'click .edit-blog': 'edit',
		'click .update-blog': 'update',
		'click .cancel': 'cancel',
		'click .finish-blog': 'finishFun',
		'click .delete-blog': 'delete'
	},
	finishFun:function(){
		//this.$el.html(this.template1(this.model.toJSON()));
		//$('.edit-blog').hide();
		//$('.finish-blog').hide();
		//$('.delete-blog').hide();
		//var str=document.getElementById('fin').innerHTML;
	// 	alert(this.model.toJSON().title)
	// this.$('.title').html('<p><strike>'+this.model.toJSON().title+'</strike></p>');
		//this.$el.html(str);
	},
	edit: function() {
		$('.edit-blog').hide();
		$('.finish-blog').hide();
		$('.delete-blog').hide();
		this.$('.update-blog').show();
		this.$('.cancel').show();

		var title = this.$('.title').html();

		this.$('.title').html('<input type="text" class="form-control title-update" style="margin-left:-530px;width: 200px;"  value="' + title + '">');
	},
	update: function() {
		this.model.set('title', $('.title-update').val());

		this.model.save(null);
	},
	cancel: function() {
		blogsView.render();
	},
	delete: function() {
		this.model.destroy();
	},
	render: function() {
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
});


var BlogsView = Backbone.View.extend({
	model: blogs,
	el: $('.blogs-list'),
	initialize: function() {
		var self = this;
		this.model.on('add', this.render, this);
		this.model.on('change', function() {
			setTimeout(function() {
				self.render();
			}, 30);
		},this);
		this.model.on('remove', this.render, this);

		this.model.fetch({
			success: function(response) {
				_.each(response.toJSON(), function(item) {
				})
			}
		});
	},
	render: function() {
		var self = this;
		this.$el.html('');
		_.each(this.model.toArray(), function(blog) {
			self.$el.append((new BlogView({model: blog})).render().$el);
		});
		return this;
	}
});

var blogsView = new BlogsView();

$(document).ready(function() {
	$('.add-blog').on('click', function() {
		var blog = new Blog({
			title: $('.title-input').val(),
		});
		$('.title-input').val('');
		blogs.add(blog);
		blog.save(null);
	});
})